import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'

const StatCard = ({ label, value, sub, color }) => (
    <div className={`flex flex-col gap-1 p-5 rounded-xl border shadow-sm bg-white min-w-[160px] flex-1`}>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
)

// Returns display info based on which backend is active
const getBackendInfo = (backend) => {
    if (backend === 'memory') {
        return {
            barScale: 5,    // max ms for the progress bar (in-memory is sub-ms, use a 0–5ms range)
            label: 'In-Memory (Node.js)',
            emoji: '',
            color: 'bg-green-100 text-green-700 border-green-300',
            cachedLabel: 'Cached (In-Memory)',
            cachedSub: 'Requests served from in-process memory',
            howItWorks: [
                'A user requests GET /api/course/all',
                'The server checks the in-process Node.js Map for key courses:all',
                'Cache HIT → response returned instantly (no network hop)',
                'Cache MISS → MongoDB queried, result stored in memory for 1 hour',
                'When admin adds a course, courses:all is invalidated immediately',
            ],
            description: 'Live metrics from the in-process Node.js memory cache. No network hop — data lives inside the server process.',
            speedNote: 'In-process cache typically serves responses faster than Redis due to zero network overhead.',
        }
    }
    // Default: redis
    return {
        barScale: 300,  // max ms for the progress bar (redis is network-bound, ~0–300ms range)
        label: 'Redis (Upstash)',
        emoji: '',
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        cachedLabel: ' Cached (Redis)',
        cachedSub: 'Requests served from Redis',
        howItWorks: [
            'A user requests GET /api/course/all',
            'The server checks Redis for key courses:all',
            'Cache HIT → response returned from Redis',
            'Cache MISS → MongoDB queried, result cached in Redis for 1 hour',
            'When admin adds a course, courses:all is invalidated immediately',
        ],
        description: 'Live metrics from the Redis caching layer (Upstash). Stats reset on server restart.',
        speedNote: 'Redis typically serves responses 5–10× faster than a direct database query.',
    }
}

const PerformanceDashboard = () => {
    const { backendUrl, getToken, isAdmin } = useContext(AppContext)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        setStats(null)
        setLoading(true)
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/admin/cache-stats', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                setStats(data.stats)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const clearCache = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.delete(backendUrl + '/api/admin/cache-clear', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                toast.success('Cache cleared! Next request will be a MISS.')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const resetStatsHandler = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.post(backendUrl + '/api/admin/cache-stats/reset', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                toast.success('Stats reset to zero!')
                fetchStats()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (isAdmin) fetchStats()
    }, [isAdmin])

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    // Resolve backend-specific labels (fall back to redis if not set)
    const backend = stats?.cacheBackend || 'redis'
    const info = getBackendInfo(backend)

    return (
        <div className="min-h-screen p-6 md:p-8 bg-gray-50">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800"> Cache Performance Dashboard</h1>
                <p className="text-sm text-gray-400 mt-1">{info.description}</p>
            </div>

            {/* Active Backend Badge */}
            {stats && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8 ${info.color}`}>
                    <span>{info.emoji}</span>
                    <span>Active Backend: {info.label}</span>
                    <span className="text-xs font-normal opacity-70">— change <code>CACHE_BACKEND</code> in <code>.env</code> &amp; restart to switch</span>
                </div>
            )}

            {stats ? (
                <>
                    {/* Stat Cards */}
                    <div className="flex flex-wrap gap-4 mb-10">
                        <StatCard
                            label="Cache Hits"
                            value={stats.hits}
                            sub={info.cachedSub}
                            color="text-green-500"
                        />
                        <StatCard
                            label="Cache Misses"
                            value={stats.misses}
                            sub="Requests that hit MongoDB"
                            color="text-red-400"
                        />
                        <StatCard
                            label="Total Requests"
                            value={stats.total}
                            sub="Hits + Misses"
                            color="text-blue-500"
                        />
                        <StatCard
                            label="Hit Rate"
                            value={stats.hitRate}
                            sub="Higher is better"
                            color="text-cyan-500"
                        />
                    </div>

                    {/* Response Time Comparison */}
                    <div className="bg-white rounded-xl border shadow-sm p-6 max-w-2xl mb-8">
                        <h2 className="text-base font-semibold text-gray-700 mb-4">Average Response Times</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{info.cachedLabel}</span>
                                    <span className="font-medium text-green-600">
                                        {stats.avgCachedMs === 'N/A' ? 'No data yet' : `${stats.avgCachedMs} ms`}
                                    </span>
                                </div>
                                {stats.avgCachedMs !== 'N/A' && (
                                    <div className="w-full bg-gray-100 rounded-full h-3">
                                        <div
                                            className="bg-green-400 h-3 rounded-full transition-all duration-700"
                                            style={{ width: `${Math.min((parseFloat(stats.avgCachedMs) / info.barScale) * 100, 100)}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Uncached (MongoDB)</span>
                                    <span className="font-medium text-red-500">
                                        {stats.avgUncachedMs === 'N/A' ? 'No data yet' : `${stats.avgUncachedMs} ms`}
                                    </span>
                                </div>
                                {stats.avgUncachedMs !== 'N/A' && (
                                    <div className="w-full bg-gray-100 rounded-full h-3">
                                        <div
                                            className="bg-red-400 h-3 rounded-full transition-all duration-700"
                                            style={{ width: `${Math.min((parseFloat(stats.avgUncachedMs) / 300) * 100, 100)}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">{info.speedNote}</p>
                    </div>


                    {/* Action Buttons */}
                    <div className="mt-2 flex gap-3 flex-wrap">
                        <button
                            onClick={fetchStats}
                            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Refresh Stats
                        </button>
                        <button
                            onClick={clearCache}
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Clear Cache (force MISS)
                        </button>
                        <button
                            onClick={resetStatsHandler}
                            className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Reset Counters to Zero
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-400">No stats available yet. Visit some course pages first to generate cache data.</p>
            )}
        </div>
    )
}

export default PerformanceDashboard
