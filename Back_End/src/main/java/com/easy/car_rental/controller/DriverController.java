package com.easy.car_rental.controller;

import com.easy.car_rental.service.AdminService;
import com.easy.car_rental.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/Driver")
public class DriverController {
    @Autowired
    private DriverService service;
}
