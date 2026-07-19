package com.example.vfprint.service.component;

import org.springframework.stereotype.Component;

import com.example.vfprint.enums.DeviceType;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class DeviceDetector {
    public DeviceType detect(
            HttpServletRequest request
    ) {

        String mobile =
                request.getHeader("sec-ch-ua-mobile");

        if ("?1".equals(mobile)) {
            return DeviceType.MOBILE;
        }

        String ua =
                request.getHeader("User-Agent");

        if (ua != null &&
                (ua.contains("Android")
                        || ua.contains("iPhone")
                        || ua.contains("Mobile"))) {

            return DeviceType.MOBILE;
        }

        return DeviceType.WEB;
    }
}
