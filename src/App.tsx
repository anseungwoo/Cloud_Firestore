import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MessageList } from './domain/pubApply/MessageList.model';
import { FirebasePubApply } from './FirebasePubApply';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './index';
import { FirebaseTypeChange } from './domain/utils/FirebaseTypeChange';
import logo from './logo.svg';

//um0JKgobEjavsyooHhAul1MoUkj2 asdf
//baqViz3pzgSOHhztfEhOPLoEVHN2 qwer
function App() {
  const [message, setMessage] = useState<MessageList[]>([]);
  const [loginUser, setLoginUser] = useState<string>(
    'um0JKgobEjavsyooHhAul1MoUkj2'
  );
  const [nickName, setNickName] = useState<string>('체인저');
  const [inputText, setInputText] = useState('');
  const chatListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight);
    console.log('스크롤!');
  }, [message]);
  // 입력된 텍스트 업데이트
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  // 전송 버튼 클릭 또는 Enter 키 눌렀을 때 동작
  const handleSubmit = async () => {
    await addmessage(inputText);

    setInputText('');
  };

  // Enter 키 눌렀을 때 동작
  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 기본적인 Enter 키 동작을 막음
      handleSubmit();
    }
  };
  const qwer로그인 = async () => {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, 'qwer@qwer.qwer', '123456');
    setLoginUser('baqViz3pzgSOHhztfEhOPLoEVHN2');
    setNickName('빅스');
  };
  const asdf로그인 = async () => {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, 'asdf@asdf.asdf', '123456');
    setLoginUser('um0JKgobEjavsyooHhAul1MoUkj2');
    setNickName('체인저');
  };
  const 로그아웃 = async () => {
    const auth = getAuth();

    await auth.signOut();
  };

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = () => {
    onSnapshot(doc(db, 'messageList', 'aaa'), (doc) => {
      let tempList: MessageList[] = [];
      for (const oneLogData of FirebaseTypeChange.listFromData(
        doc.data()!['data']
      )) {
        tempList.push(MessageList.fromData(oneLogData));
      }

      setMessage(tempList);
    });
  };

  const addmessage = async (message: string) => {
    const docRef = doc(db, 'messageList', 'aaa');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        data: arrayUnion(
          new MessageList(
            message.length + 1,
            loginUser,
            nickName,
            message,
            new Date()
          ).toMap
        ),
      });
    } else {
      await setDoc(docRef, {
        data: [
          new MessageList(
            message.length + 1,
            loginUser,
            nickName,
            message,
            new Date()
          ).toMap,
        ],
      });
    }
  };
  const updateMessage = () => {};
  const deleteMessage = () => {};

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row">
        <div className="w-[40%] flex flex-col justify-start items-start p-2 text-sm">
          <button
            className="w-full border-4 p-2 rounded-full border-blue-500"
            onClick={asdf로그인}
          >
            asdf로그인
          </button>
          <button
            className="w-full border-4 p-2 rounded-full border-blue-500 my-2"
            onClick={qwer로그인}
          >
            qwer로그인
          </button>
          <button
            className="w-full border-4 p-2 rounded-full border-red-500"
            onClick={로그아웃}
          >
            로그아웃
          </button>
        </div>
        <div className="w-[60%] h-full flex flex-col bg-slate-400">
          <div
            className="overflow-y-auto h-full max-h-[90vh]"
            ref={chatListRef}
          >
            {message.map((v, i) =>
              v.userId === loginUser ? (
                <div
                  className="w-full flex justify-end p-3"
                  key={`${v.userId}_${i}`}
                >
                  <div className="flex flex-row">
                    <div className="m-1 self-end">{`${v.applyDate.getHours()} : ${v.applyDate.getMinutes()}`}</div>
                    <div className="rounded-2xl p-2 bg-yellow-300">
                      {v.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row pb-3" key={`${v.userId}_${i}`}>
                  <div className="w-[50px] h-[50px] rounded-3xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="aa"
                      src={logo}
                    ></img>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <div className="text-base">{v.nickName}</div>
                      <div className="rounded-2xl p-2 bg-white">
                        {v.message}
                      </div>
                    </div>

                    <div className="m-1 self-end">{`${v.applyDate.getHours()} : ${v.applyDate.getMinutes()}`}</div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="w-full bg-white p-1" style={{ height: '20%' }}>
            <div className="w-full flex flex-row">
              <textarea
                className="flex-grow mr-1"
                value={inputText}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '8px',
                  resize: 'none',
                }}
              />
              <button
                className="w-[20%] flex justify-center items-center bg-yellow-300"
                onClick={handleSubmit}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
