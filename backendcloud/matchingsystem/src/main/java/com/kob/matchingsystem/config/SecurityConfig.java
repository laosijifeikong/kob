package com.kob.matchingsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable() // 禁用CSRF保护
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// 禁用Session，采用无状态机制
                .and()
                .authorizeRequests() //开始配置请求权限
                .antMatchers("/player/add", "/player/remove").hasIpAddress("127.0.0.1")// 仅运行本地访问
                .antMatchers(HttpMethod.OPTIONS).permitAll() // 允许所有OPTIONS请求
                .anyRequest().authenticated();// 其他请求都需要认证
    }
}
