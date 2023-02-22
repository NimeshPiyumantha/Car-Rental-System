package com.easy.car_rental.controller;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.enums.RoleType;
import com.easy.car_rental.service.CarService;
import com.easy.car_rental.service.UserService;
import com.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(params = {"role_Type", "user_Name", "password"})
    public ArrayList<UserDTO> loginUser(@RequestParam String role_Type, @RequestParam String user_Name, @RequestParam String password) {
        return service.getLoginDetails(role_Type, user_Name,password);
    }
}
