package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pk")
public class IndexController
{
    @GetMapping("/hello")
    public String hello()
    {
        return "hello";
    }
}
