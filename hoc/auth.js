import React, { useEffect } from "react";
import { auth } from "리듀서나 액션에서 가져오기";
import { useSelector, useDispatch } from "react-redux";

//null   아무나 들어올 수 있도록 함
//true   로그인을 한 사용자만 들어갈 수 있도록 함
//false  로그인을 한 사용자도 못들어 가도록 함

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {

        //로그인이 되지 않은 상태
        if (!response.payload.인증데이터) {
          if (option) {
            props.history.push("/login");
          }
          
        } else {

          //로그인이 된 상태

          //관리자가 아닌사람이 관리자 페이지로 들어가려 할때
          if (adminRoute && !response.payload.관리자데이터) {
            props.history.push("/");
          }
          else {

            //로그인된 사용자가 로그인 페이지로 들어가려 할때
            if (option === false) {
              props.history.push("/");
            }

          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
