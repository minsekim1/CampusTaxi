
# 설치
	git clone "git주소" && npm install

# 기본 실행 명령어
	디버깅 : cd .env && shstart_debug.sh
	배포 apk 생성(반드시 app.json 와 android/app/build.gradle에서 버전(versionCode)을 +1하십시오. 현재 최신 배포 31버전)
	: cd .env && sh createAPK_androidbuild.sh
# .env 설명
.env는 테스트 및 실행하기 위해서 있는 폴더입니다.
cd .env && sh start_debug.sh 처럼 사용하시면됩니다.
(permition 권한 문제가 있을 경우 sudo sh start_debug.sh를 사용하세요.)

# 각 파일별 설명
	adb 연결 | adbconnect_home.sh
	adb 연결 | adbconnect_tablet.sh
	adb 연결 | adbconnect.sh
	adb 연결 | adbdevices.sh
	adb 5555 포트 연결 | adbtcpip5555.sh
	캠퍼스택시 키 | campustaxi.jks
	aab 빌드 만들기(배포용) | createAAB_androidbuild.sh
	
	* apk 빌드 만들기(배포용) | createAPK_androidbuild.sh
	
	git clean | gitclean.sh
	git min97로 config 설정 | gitconfigminsekim.sh
	git add 하고 git push 해줌. sh gitupload.sh "커밋 내용" 하면 커밋 내용도 보내짐. | gitupload.sh
	android빌드시 문제가 생기면 gradle clean을 통해 새로 깨끗하게 빌드함 | gradleclean.sh
	
	* 안드로이드용 실행명령어 sh start_debug.sh로 테스트 | start_debug.sh
  
	아이폰용 실행명령어 xcode가 깔려있어야하고 맥이어야함. 또 m1 칩이면 안됌 | start_ios.sh
	현재 안쓰는 배포명령어 | start_release.sh

# src 구조
 모든 소스코드는 src 안에 있습니다.
 npm 관련 라이브러리는 package.json을 참고하세요.
App.tsx => root.tsx 순으로 빌드최고 최초에는 notab/login/LoginScreen.tsx로 이동됩니다.
components는 notab과 tab에 들어가는 아이콘이나 컴포넌트입니다.
주 페이지는 notab과 tab만 보시면 확인할 수 있습니다.
notab과 tab폴더의 차이는 네비게이션 앱 하단의 탭바의 기준입니다. 이때 setNav함수로 이동합니다.
tab, notab MessageScreen은 내채팅을 포함한 채팅방과 채팅 세부사항(대화상대목록)이 있는 곳입니다.
tab/home은 로그인시 페이지 입니다. CreateScreen.tsx에 지도가 있어서 방 선택후 CreateScreenDetails.tsx에서 방을 생성합니다.
setting폴더는 로그인 후 탭 하단 제일 오른쪽 끝에 문의하기/내정보보는 탭의 내용들입니다.

 ├── App.tsx
├── components
│   ├── axios
│   │   └── axios.tsx axios를 편하게 사용하기 위한 함수가 있음.
│   ├── background
│   │   ├── BgPremium.tsx 프리미엄 탭에서 프리미엄 혜택을 표현하는 바탕
│   │   └── bgPremium.jpeg
│   ├── button							//각종 버튼들
│   │   ├── BlankButton.tsx
│   │   ├── BottomButton.tsx
│   │   ├── CardButton.tsx
│   │   ├── CopyToClipboard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── SimpleButton.tsx
│   │   └── ToggleButton.tsx
│   ├── chat								//내 채팅 목록에 들어가는 내부 UI부품
│   │   ├── ChatList.tsx
│   │   ├── Message.tsx
│   │   ├── date.tsx
│   │   └── unused_MessageCard.tsx
│   ├── chat-room						//채팅방에 들어가는 내부 UI부품
│   │   ├── ChatDatilsCardMember.tsx
│   │   ├── ChatDetailsCard.tsx
│   │   ├── ChatRoomCard.tsx
│   │   ├── ChatRoomList.tsx
│   │   ├── CustomAlert.tsx
│   │   ├── ETAView.tsx
│   │   ├── EmailSend.tsx
│   │   ├── KeyBoardInput.js
│   │   ├── KeyboardView.js
│   │   ├── unused_ChatRoomCard.tsx
│   │   └── unused_KeyBoard.tsx
│   ├── checkbox					//회원가입시 사용하는 체크박스
│   │   └── SimpleCheckBox.tsx
│   ├── color							//성별을 통한 색상구분을 위한 함수
│   │   └── GenderColor.tsx
│   ├── form							//input 태그를 사용한 UI 컴포넌트
│   │   ├── HomeLocationTextField.tsx
│   │   ├── PhoneVerification.tsx
│   │   └── TextField.tsx
│   ├── icon							//아이콘들 svg를 옮긴것임
│   │   ├── ArriveIcon.tsx
│   │   ├── CloseIcon.tsx
│   │   ├── DepartIcon.tsx
│   │   ├── DotlineIcon.tsx
│   │   ├── KakaoIcon.tsx
│   │   ├── RightIcon.tsx
│   │   ├── chat
│   │   │   ├── BackIconWhite.tsx
│   │   │   ├── Crown.tsx
│   │   │   ├── DottedLine.tsx
│   │   │   ├── KickSVG.tsx
│   │   │   ├── ManRect.tsx
│   │   │   ├── MarkerSVG.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── OutRoomSVG.tsx
│   │   │   ├── SearchIcon.tsx
│   │   │   └── WomanRect.tsx
│   │   ├── chat-room
│   │   │   ├── AddIcon.tsx
│   │   │   ├── CameraIcon.tsx
│   │   │   ├── CancleIcon.tsx
│   │   │   ├── DownArrowIcon.tsx
│   │   │   ├── GalleryIcon.tsx
│   │   │   ├── SendArrowIcon.tsx
│   │   │   ├── SendIcon.tsx
│   │   │   ├── SmileIcon.tsx
│   │   │   └── UpArrowIcon.tsx
│   │   ├── home
│   │   │   ├── AlarmBellIcon.tsx
│   │   │   ├── BookIcon.tsx
│   │   │   ├── BusIcon.tsx
│   │   │   ├── ClubIcon.tsx
│   │   │   ├── CreateRoomIcon.tsx
│   │   │   ├── CreateRoomSelectCancel.tsx
│   │   │   ├── EtcIcon.tsx
│   │   │   ├── GameIcon.tsx
│   │   │   ├── MiniEIcon.tsx
│   │   │   ├── MiniHomeIcon.tsx
│   │   │   ├── PencilIcon.tsx
│   │   │   ├── PoolIcon.tsx
│   │   │   ├── RideIcon.tsx
│   │   │   ├── SchoolIcon.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── SkiIcon.tsx
│   │   │   └── TextFieldCancleIcon.tsx
│   │   ├── notification
│   │   │   ├── MessageIcon.tsx
│   │   │   └── NoticeIcon.tsx
│   │   ├── premium
│   │   │   ├── AdFree.tsx
│   │   │   ├── AdPayment.tsx
│   │   │   ├── AdPhoto.tsx
│   │   │   ├── AdProfile.tsx
│   │   │   ├── AdTheme.tsx
│   │   │   └── PremiumIcon.tsx
│   │   └── setting
│   │       ├── CancleIcon.tsx
│   │       ├── DefaultIcon.tsx
│   │       ├── PlusIcon.tsx
│   │       └── defaultIcon.png
│   ├── layout
│   │   ├── BlankBackground.tsx
│   │   └── Toast.tsx
│   ├── logo
│   │   ├── Logo.tsx
│   │   ├── MainLogo.tsx
│   │   └── RegisterLogo.tsx
│   ├── map											//create 지도와 관련된 UI부품들
│   │   ├── CreateSelectedView.tsx
│   │   ├── GuideCenterSVG.tsx
│   │   ├── MapBottomButton.tsx
│   │   ├── MapController.tsx
│   │   ├── MapRoomCard.tsx
│   │   ├── MapView.tsx
│   │   ├── SelectBottomPosView.tsx
│   │   ├── SelectedBottomView.tsx
│   │   ├── SwipeableView.tsx
│   │   └── TEMP.tsx
│   ├── tab-icon								//로그인 후 하단의 네비게이션 탭 아이콘들
│   │   ├── HomeIcon.tsx
│   │   ├── HomeIconActive.tsx
│   │   ├── MessageIcon.tsx
│   │   ├── MessageIconActive.tsx
│   │   ├── PremiumIcon.tsx
│   │   ├── PremiumIconActive.tsx
│   │   ├── SettingIcon.tsx
│   │   └── SettingIconActive.tsx
│   └── text
│       ├── Description.tsx
│       ├── SImpleText.tsx
│       └── Title.tsx
├── constant.ts								// *** 중요 *** nodejs 서버 및 불변 변수 설정하는 파일. 외부서버 연동 주소를 바꾸려면 socketURL의 ["AWSnodejsLoadBanlancer"] 이거를 바꾸면 된다.
├── contexts									// contextAPI를 제어하는 컴포넌트 잘 쓸일없음.
│   ├── AuthContext.tsx
│   ├── Bank.tsx
│   ├── User.tsx
│   └── univPos.tsx
└── screens										//실제 앱 화면
    ├── RootScreen.tsx				//로딩화면
    ├── notab									//로그인 후 탭이 없는 화면, 단 login폴더는 로그인 전이니 예외
    │   ├── NoTabNavigation.tsx
    │   ├── home							// 홈탭
    │   │   ├── CreateScreen.tsx //방만들기 때 지도보면서 방선택 곳
    │   │   ├── CreateScreenDetails.tsx //방선택 후 세부내용 설정하고 방생성 api 보내는곳
    │   │   └── HomeNoTabNavigation.tsx
    │   ├── login										//로그인 폴더
    │   │   ├── LoginNavigation.tsx
    │   │   ├── LoginScreen.tsx			//로그인 화면(로그인 하려고 아이디/비번 입력하는곳)
    │   │   ├── document						// 약관 4개에 대한 페이지
    │   │   │   ├── GeoScreen.tsx
    │   │   │   ├── MarketingScreen.tsx
    │   │   │   ├── PrivacyScreen.tsx
    │   │   │   └── TermsScreen.tsx
    │   │   ├── findId						//아이디찾기
    │   │   │   ├── FindIdScreen.tsx
    │   │   │   └── FoundScreen.tsx
    │   │   ├── findPassword			//패스워드찾기
    │   │   │   ├── FindPasswordScreen.tsx
    │   │   │   └── ResetScreen.tsx
    │   │   └── register					//회원가입폴더
    │   │       ├── AgreeScreen.tsx		//약관동의
    │   │       ├── RegisterScreen.tsx //별명, 휴대폰인증, 학생증 제출하고 세부정보입력하는곳
    │   │       └── RegisterSuccessScreen.tsx //회원가입 성공시 뜨는 페이지
    │   ├── message								//내 채팅방에서 채팅방 안에 들어간 notab부분
    │   │   ├── ChatRoomScreen.tsx //채팅방 내부
    │   │   ├── ChatRoomScreenDetails.tsx //채팅방 대화상대 내부 (카카오택시 호출등이 있다)
    │   │   └── MessageNoTabNavigation.tsx
    │   ├── notification					//알림 페이지
    │   │   ├── NotificationNoTabNavigation.tsx
    │   │   └── NotificationScreen.tsx //현재는 홈탭 tab/homeTab/HomeScreen에서 주석처리 되어있으며 활성시 누르면 여기로 들어간다.
    │   └── setting								//로그인 후 하단 마지막 탭 세팅에서 앱 정보, 은행, 내 정보를 누르면 들어가는 페이지
    │       ├── AccountScreen.tsx
    │       ├── AppInfo.tsx
    │       ├── BankScreen.tsx
    │       └── SettingNoTabNavigation.tsx
    └── tab													//로그인 후 하단 네비게이션이 있는 탭들 페이지 모음
        ├── TabNavigation.tsx
        ├── homeTab									//홈탭
        │   ├── HomeScreen.tsx
        │   ├── HomeStackNavigation.tsx
        │   └── HomeTabScreen.tsx
        ├── messageTab							//내채팅 탭
        │   ├── MessageScreen.tsx
        │   ├── MessageStackNavigation.tsx
        │   └── MessageTabScreen.tsx
        ├── premiumTab						//프리미엄 탭
        │   ├── PremiumScreen.tsx
        │   ├── PremiumStackNavigation.tsx
        │   ├── PremiumTabScreen.tsx
        │   └── RNIapFunction.tsx
        └── settingTab				//설정 탭
            ├── SettingScreen.tsx
            ├── SettingStackNavigation.tsx
            └── SettingTabScreen.tsx
