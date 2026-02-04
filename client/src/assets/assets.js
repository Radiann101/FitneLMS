import logo from './fitness-icon-for-your-website-design-logo-app-ui-free-vector.jpg'
import icon from './user-icon-member-login-isolated-vector.jpg'
import searchIcon from './search-icon.png'
import filledStar from './filled-star.jpg'
import blankStar from './star-blank.jpg'
import aboutMe from './about me.png'
import arrowDown from './down_arrow_40x40.jpg'
import playIcon from './play-icon_1_42x42.jpg'
import arrowUp from './arrow-Up_40x40.png'
import clock from './clock_1_30x30.png'
import books from './books_30x30.jpg'
import checkmark from './checkmark_40x40.jpg'
import allUsers from './all_users_40x40.png'
import allCourses from './all_courses_40x40.png'
import addCourse from './add_course_40x40.png'
import dashboardLogo from './dashboard_icon_40x40.png'
import upload_icon from './upload_40x40.png'
import dropdown_icon from './dropdown_40x40.png'
import crossIcon from './cross-23_40x40.png'
import about1 from './About1.png'
import about2 from './About2.png'
import about3 from './About3.png'
import about4 from './About4.png'
import about5 from './About5.png'
import AboutMe from './aboutMe.jpg'
import aboutMe2 from './aboutmeeeee.jpg'


export const assets ={
    logo,
    icon,
    searchIcon,
    filledStar,
    blankStar,
    aboutMe,
    arrowDown,
    playIcon,
    arrowUp,
    clock,
    books,
    checkmark,
    allUsers,
    allCourses,
    addCourse,
    dashboardLogo,
    upload_icon,
    dropdown_icon,
    crossIcon,
    about1, about2, about3, about4, about5,
    AboutMe, aboutMe2
}

export const testData =[
    {
    "_id": "id111",
    "courseTitle": "Upper body workout",
    "courseDescription": "<h1><b>Upper body workout routine from A to Z.</b></h1> <h2>abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc</h2>",
    "isUploaded":true,
    "courseMaterial":[
        {
            "chapterId": "chapter11",
            "chapterOrder": 1,
            "chapterTitle": "Upper body exercises: Chest",
            "chapterMaterial":[
                {
                    "lectureId":"lecture111",
                    "lectureTitle":"Chest day example 1",
                    "lectureDuration": 8,
                    "lectureUrl": "https://www.youtube.com/watch?v=KIl70ffF5FM",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture112",
                    "lectureTitle":"Chest day example 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=zD266B2jk0s",
                    "lectureOrder":2
                }
            ]
        }, {
            "chapterId": "chapter12",
            "chapterOrder": 2,
            "chapterTitle": "Upper body exercises: Shoulders",
            "chapterMaterial":[
                {
                    "lectureId":"lecture121",
                    "lectureTitle":"Shoulder exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=KIl70ffF5FM",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture122",
                    "lectureTitle":"Shoulder exercises 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=zD266B2jk0s",
                    "lectureOrder":2
                }
            ]
        },
        {
            "chapterId": "chapter13",
            "chapterOrder": 2,
            "chapterTitle": "Upper body exercises: Shoulders",
            "chapterMaterial":[
                {
                    "lectureId":"lecture131",
                    "lectureTitle":"Shoulder exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=KIl70ffF5FM",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture132",
                    "lectureTitle":"Shoulder exercises 2",
                    "lectureDuration": 13,
                    "lectureUrl": "https://www.youtube.com/watch?v=zD266B2jk0s",
                    "lectureOrder":2
                }
            ]
        }
    ],
    "admin": "me",
    "enrolledUsers" :[
        "user1",
        "user2",
        "user3"
    ],
    "courseRatings":[
        {
            "userId":"user1",
            "rating": 2,
            "id": "rating1"
        },{
            "userId":"user2",
            "rating": 4,
            "id": "rating1"
        }
    ],
    "uploadedAt":"2026-01-21",
    "lastUpdated":"2026-01-21",
    "courseThumbnail":"https://learn.athleanx.com/wp-content/uploads/2022/02/upper-body-muscle-groups.jpg"
    },
    {
    "_id": "id222",
    "courseTitle": "Lower body workout I",
    "courseDescription": "<h2>Lower body workout routine from A to Z</h2>",
    "isUploaded":true,
    "courseMaterial":[
        {
            "chapterId": "chapter21",
            "chapterOrder": 1,
            "chapterTitle": "Quads",
            "chapterMaterial":[
                {
                    "lectureId":"lecture211",
                    "lectureTitle":"Quads exercises example 1",
                    "lectureDuration": 8,
                    "lectureUrl": "https://www.youtube.com/watch?v=-7TPSr0-yo4",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture212",
                    "lectureTitle":"Quads exercises example 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=kIXcoivzGf8",
                    "lectureOrder":2
                }
            ]
},{
            "chapterId": "chapter22",
            "chapterOrder": 2,
            "chapterTitle": "Hamstring",
            "chapterMaterial":[
                {
                    "lectureId":"lecture221",
                    "lectureTitle":"Hamstring exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=2PGC_gmgj30",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture222",
                    "lectureTitle":"Hamstring exercises 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=vynsCfHZ69A",
                    "lectureOrder":2
                }
            ]
        },
    ],
    "admin": "me",
    "enrolledUsers" :[
        "user1",
        "user2",
        "user3"
    ],
    "courseRatings":[
        {
            "userId":"user1",
            "rating": 3,
            "id": "rating1"
        },
        {
            "userId":"user1",
            "rating": 5,
            "id": "rating1"
        }
    ],
    "uploadedAt":"2026-01-21",
    "lastUpdated":"2026-01-21",
    "courseThumbnail":"https://images.bannerbear.com/direct/4mGpW3zwpg0ZK0AxQw/requests/000/101/366/902/APW1bDp49YKaqvBP6jmVoORax/8010ad0d09aca96c126d17aee1a917660a134429.jpg"
},
 {
    "_id": "id333",
    "courseTitle": "Lower body workout II",
    "courseDescription": "<h2>Lower body workout routine from A to Z</h2>",
    "isUploaded":true,
    "courseMaterial":[
        {
            "chapterId": "chapter31",
            "chapterOrder": 1,
            "chapterTitle": "Quads",
            "chapterMaterial":[
                {
                    "lectureId":"lecture311",
                    "lectureTitle":"Quads exercises example 1",
                    "lectureDuration": 8,
                    "lectureUrl": "https://www.youtube.com/watch?v=-7TPSr0-yo4",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture312",
                    "lectureTitle":"Quads exercises example 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=kIXcoivzGf8",
                    "lectureOrder":2
                }
            ]
},{
            "chapterId": "chapter32",
            "chapterOrder": 2,
            "chapterTitle": "Hamstring",
            "chapterMaterial":[
                {
                    "lectureId":"lecture321",
                    "lectureTitle":"Hamstring exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=2PGC_gmgj30",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture322",
                    "lectureTitle":"Hamstring exercises 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=vynsCfHZ69A",
                    "lectureOrder":2
                }
            ]
        },
    ],
    "admin": "me",
    "enrolledUsers" :[
        "user1",
        "user2",
        "user3"
    ],
    "courseRatings":[
        {
            "userId":"user1",
            "rating": 3,
            "id": "rating1"
        },
    ],
    "uploadedAt":"2026-01-21",
    "lastUpdated":"2026-01-21",
    "courseThumbnail":"https://images.bannerbear.com/direct/4mGpW3zwpg0ZK0AxQw/requests/000/101/366/902/APW1bDp49YKaqvBP6jmVoORax/8010ad0d09aca96c126d17aee1a917660a134429.jpg"
},
 {
    "_id": "id444",
    "courseTitle": "Lower body workout III",
    "courseDescription": "<h2>Lower body workout routine from A to Z</h2>",
    "isUploaded":true,
    "courseMaterial":[
        {
            "chapterId": "chapter41",
            "chapterOrder": 1,
            "chapterTitle": "Quads",
            "chapterMaterial":[
                {
                    "lectureId":"lecture411",
                    "lectureTitle":"Quads exercises example 1",
                    "lectureDuration": 8,
                    "lectureUrl": "https://www.youtube.com/watch?v=-7TPSr0-yo4",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture412",
                    "lectureTitle":"Quads exercises example 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=kIXcoivzGf8",
                    "lectureOrder":2
                }
            ]
},{
            "chapterId": "chapter42",
            "chapterOrder": 2,
            "chapterTitle": "Hamstring",
            "chapterMaterial":[
                {
                    "lectureId":"lecture421",
                    "lectureTitle":"Hamstring exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=2PGC_gmgj30",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture422",
                    "lectureTitle":"Hamstring exercises 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=vynsCfHZ69A",
                    "lectureOrder":2
                }
            ]
        },
    ],
    "admin": "me",
    "enrolledUsers" :[
        "user1",
        "user2",
        "user3"
    ],
    "courseRatings":[
        {
            "userId":"user1",
            "rating": 3,
            "id": "rating1"
        },
        {
            "userId":"user1",
            "rating": 5,
            "id": "rating1"
        }
    ],
    "uploadedAt":"2026-01-21",
    "lastUpdated":"2026-01-21",
    "courseThumbnail":"https://images.bannerbear.com/direct/4mGpW3zwpg0ZK0AxQw/requests/000/101/366/902/APW1bDp49YKaqvBP6jmVoORax/8010ad0d09aca96c126d17aee1a917660a134429.jpg"
},
 {
    "_id": "id555",
    "courseTitle": "Lower body workout IV",
    "courseDescription": "<h2>Lower body workout routine from A to Z</h2>",
    "isUploaded":true,
    "courseMaterial":[
        {
            "chapterId": "chapter51",
            "chapterOrder": 1,
            "chapterTitle": "Quads",
            "chapterMaterial":[
                {
                    "lectureId":"lecture511",
                    "lectureTitle":"Quads exercises example 1",
                    "lectureDuration": 8,
                    "lectureUrl": "https://www.youtube.com/watch?v=-7TPSr0-yo4",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture512",
                    "lectureTitle":"Quads exercises example 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=kIXcoivzGf8",
                    "lectureOrder":2
                }
            ]
},{
            "chapterId": "chapter52",
            "chapterOrder": 2,
            "chapterTitle": "Hamstring",
            "chapterMaterial":[
                {
                    "lectureId":"lecture521",
                    "lectureTitle":"Hamstring exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=2PGC_gmgj30",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture522",
                    "lectureTitle":"Hamstring exercises 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=vynsCfHZ69A",
                    "lectureOrder":2
                }
            ]
        },
    ],
    "admin": "me",
    "enrolledUsers" :[
        "user1",
        "user2",
        "user3"
    ],
    "courseRatings":[
        {
            "userId":"user1",
            "rating": 3,
            "id": "rating1"
        },
        {
            "userId":"user1",
            "rating": 5,
            "id": "rating1"
        }
    ],
    "uploadedAt":"2026-01-21",
    "lastUpdated":"2026-01-21",
    "courseThumbnail":"https://images.bannerbear.com/direct/4mGpW3zwpg0ZK0AxQw/requests/000/101/366/902/APW1bDp49YKaqvBP6jmVoORax/8010ad0d09aca96c126d17aee1a917660a134429.jpg"
},

{
    "_id": "id666",
    "courseTitle": "Lower body workout V",
    "courseDescription": "<h2>Lower body workout routine from A to Z</h2>",
    "isUploaded":true,
    "courseMaterial":[
        {
            "chapterId": "chapter61",
            "chapterOrder": 1,
            "chapterTitle": "Quads",
            "chapterMaterial":[
                {
                    "lectureId":"lecture611",
                    "lectureTitle":"Quads exercises example 1",
                    "lectureDuration": 8,
                    "lectureUrl": "https://www.youtube.com/watch?v=-7TPSr0-yo4",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture612",
                    "lectureTitle":"Quads exercises example 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=kIXcoivzGf8",
                    "lectureOrder":2
                }
            ]
},{
            "chapterId": "chapter62",
            "chapterOrder": 2,
            "chapterTitle": "Hamstring",
            "chapterMaterial":[
                {
                    "lectureId":"lecture621",
                    "lectureTitle":"Hamstring exercises 1",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=2PGC_gmgj30",
                    "lectureOrder":1
                },
                {
                    "lectureId":"lecture622",
                    "lectureTitle":"Hamstring exercises 2",
                    "lectureDuration": 10,
                    "lectureUrl": "https://www.youtube.com/watch?v=vynsCfHZ69A",
                    "lectureOrder":2
                }
            ]
        },
    ],
    "admin": "me",
    "enrolledUsers" :[
        "user1",
        "user2",
        "user3"
    ],
    "courseRatings":[
        {
            "userId":"user1",
            "rating": 3,
            "id": "rating1"
        },
        {
            "userId":"user1",
            "rating": 5,
            "id": "rating1"
        }
    ],
    "uploadedAt":"2026-01-21",
    "lastUpdated":"2026-01-21",
    "courseThumbnail":"https://images.bannerbear.com/direct/4mGpW3zwpg0ZK0AxQw/requests/000/101/366/902/APW1bDp49YKaqvBP6jmVoORax/8010ad0d09aca96c126d17aee1a917660a134429.jpg"
},

]
export const exampleAdminData = {
    "_id": "admin_001",
    "name": "Pinter Csaba-Attila",
    "email": "pinter.csaba001@gmail.com",
    "role": "admin",
    "bio": "Certified strength and conditioning specialist with over 10 years of experience in body transformation.",
    "profileImage": "https://randomuser.me/api/portraits/men/32.jpg",
    "stats": {
        "totalCourses": 6,
        "totalStudents": 1250,
        "averageRating": 4.8
    },
    "socialLinks": {
        "instagram": "https://instagram.com/csaba",
        "youtube": "https://youtube.com/c/csaba",
        "website": "https://csaba.com"
    },
    "joinedAt": "2026-01-24",
    "notifications": true
}
export const testDashboardData = {
    "enrolledStudentsData": [
        {
            "courseTitle": "Lower body workout V",
            "student": {
                "_id": "user1",
                "name": "User1",
                "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
            }
        },
        {
            "courseTitle": "Lower body workout III",
            "student": {
                "_id": "user2",
                "name": "User2",
                "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
            }
        },
        {
            "courseTitle": "Lower body workout IV",
            "student": {
                "_id": "user3",
                "name": "User3",
                "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
            }
        },
        {
            "courseTitle": "Lower body workout I",
            "student": {
                "_id": "user2",
                "name": "User2",
                "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
            }
        },
        {
            "courseTitle": "Upper body workout",
            "student": {
                "_id": "user3",
                "name": "User3",
                "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
            }
        }
    ],
    "totalCourses": 6
}
export const testStudentEnrolled = [
    {
        "student": {
            "_id": "user3",
            "name": "User3",
            "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
        },
        "courseTitle": "Lower body workout I",
        "purchaseDate": "2024-12-20T08:39:55.509Z"
    },
    {
        "student": {
            "_id": "user2",
            "name": "User2",
            "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
        },
        "courseTitle": "Lower body workout II",
        "purchaseDate": "2024-12-20T08:59:49.964Z"
    },
    {
        "student": {
            "_id": "user1",
            "name": "User1",
            "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
        },
        "courseTitle": "Lower body workout III",
        "purchaseDate": "2024-12-20T11:03:42.931Z"
    },
    {
        "student": {
            "_id": "user3",
            "name": "User3",
            "imageUrl": "https://cdn-icons-png.flaticon.com/512/709/709699.png"
        },
        "courseTitle": "Lower body workout V",
        "purchaseDate": "2024-12-20T11:04:48.798Z"
    }
]



