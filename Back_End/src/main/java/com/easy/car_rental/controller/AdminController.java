package com.easy.car_rental.controller;

import com.easy.car_rental.service.AdminService;
import com.easy.car_rental.service.Reg_UserService;
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
@RequestMapping("/Admin")
public class AdminController {

    @Autowired
    private AdminService service;

}
