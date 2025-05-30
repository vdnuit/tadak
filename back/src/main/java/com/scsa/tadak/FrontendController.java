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
            "/detail"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
