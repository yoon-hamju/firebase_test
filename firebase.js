const firebaseConfig = {
    apiKey: "AIzaSyD6fonNuSYA_TF5rtLOqeJjKhr4qsIuVA8",
    authDomain: "project-hj-f3b6a.firebaseapp.com",
    databaseURL: "https://project-hj-f3b6a-default-rtdb.firebaseio.com",
    projectId: "project-hj-f3b6a",
    storageBucket: "project-hj-f3b6a.appspot.com",
    messagingSenderId: "182967115318",
    appId: "1:182967115318:web:400b25d77a89d174614297",
    measurementId: "G-WT14BY0KCY"
};

// 파이어베이스 앱 초기화
const app = firebase.initializeApp(firebaseConfig);
//파이어베이스앱 실시간 디비생성
const database = firebase.database();
// 데이터 저장실습
function writeUserData(userId, email, nick) {
    database.ref("users/" + userId).set({
        email: email,
        nick: nick
    });
}

// 데이터 읽기 실습
function readUserData() {
    const searchId = document.getElementById("searchId").value;
    const result = document.getElementById("result");

    if (searchId) {
        // 특정 사용자 데이터 읽기
        database.ref("users/" + searchId).once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.frm.id.value = searchId;
                document.frm.email.value = data.email;
                document.frm.nick.value = data.nick;
                result.innerHTML = `
                <table border='1'><tr><th>아이디</th><th>이메일</th><th>닉네임</th></tr> 
                <tr><td>${searchId}</td><td>${data.email}</td><td>${data.nick}</td></tr>
                                </table>`;
            } else {
                result.innerText = `아이디: ${searchId}에 해당하는 데이터가 없습니다.`;
            }
        });
    } else {
        // 전체 사용자 데이터 읽기
        database.ref("users/").once('value').then((snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);
            let tableHTML = "<table border='1'><tr><th>아이디</th><th>이메일</th><th>닉네임</th></tr>";
            keys.forEach((key) => {
                tableHTML += `<tr><td>${key}</td><td>${data[key].email}</td><td>${data[key].nick}</td></tr>`;
            });
            tableHTML += "</table>";
            result.innerHTML = tableHTML;
        });
    }
}

// 폼 제출 이벤트 처리
const btn = document.frm.btn;
btn.addEventListener("click", (event) => {
    event.preventDefault();

    const id = document.frm.id.value;
    const email = document.frm.email.value;
    const nick = document.frm.nick.value;

    console.log(id, email, nick);
    writeUserData(id, email, nick);
});

// 조회 버튼 이벤트 처리
const readBtn = document.getElementById("readBtn");
readBtn.addEventListener("click", () => {
    readUserData();
});