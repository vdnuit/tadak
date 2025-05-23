package com.scsa.tadak.user;

import com.scsa.tadak.user.SiteUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class SiteUserDetails implements UserDetails {

    private final SiteUser siteUser;
    
    

    public SiteUserDetails(SiteUser siteUser) {
        this.siteUser = siteUser;
    }

    public SiteUser getSiteUser() {
        return siteUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // 역할 설정 안 하면 비워둬도 됨
    }

    @Override
    public String getPassword() {
        return siteUser.getPassword();
    }

    @Override
    public String getUsername() {
        return siteUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
