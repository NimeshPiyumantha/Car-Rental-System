package com.easy.car_rental.controller;

import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.enums.RoleType;
import com.easy.car_rental.service.CarService;
import com.easy.car_rental.service.UserService;
import com.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/loginForm")
public class LoginController {
    @Autowired
    private UserService service;

    @GetMapping(params = {"role_Type","userName","userPassword"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil logging(@RequestParam RoleType role_Type, @RequestParam String userName , @RequestParam  String userPassword){
        System.out.println(role_Type+" "+userName+" "+userPassword);
        UserDTO userDto = service.loginUser(role_Type,userName,userPassword);
        return new ResponseUtil("OK", "Successfully Registered.!", userDto);
    }
}
