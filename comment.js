// Firebase SDKのモジュール読み込み
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase初期化
const firebaseConfig = {
    apiKey: "AIzaSyANiYe6Iv8M3i9qmoxkm0v5BCyZCSok0zk",
    authDomain: "waifu3-0.firebaseapp.com",
    projectId: "waifu3-0",
    storageBucket: "waifu3-0.appspot.com",
    messagingSenderId: "204798374835",
    appId: "1:204798374835:web:ea11ea1419710aee6b91c6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// コメントの追加関数
async function addComment() {
    const comment = document.getElementById("comment").value;
    if (comment) {
        // 現在のファイル名を取得し、拡張子を削除
        const fileName = location.pathname.split("/").pop().replace(/\.(html|md)$/, "");

        await addDoc(collection(db, fileName), {
            text: comment,
            timestamp: serverTimestamp()
        });
        document.getElementById("comment").value = "";
    }
}

// リアルタイムコメントリスナー
const fileName = location.pathname.split("/").pop().replace(/\.(html|md)$/, "");
const q = query(collection(db, fileName), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    const commentsList = document.getElementById("comments");
    commentsList.innerHTML = "";
    snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        commentsList.appendChild(li);
    });
});


// addComment関数をグローバルで使えるように設定
window.addComment = addComment;