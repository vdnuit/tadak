package com.scsa.tadak;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = {
            "/", 
            "/login",
            "/signup", 
            "/write", 
            "/mypage", 
            "/detail"   // 필요한 클라이언트 라우트만 명시
    })
    public String forward() {
        return "forward:/index.html";
    }
}
