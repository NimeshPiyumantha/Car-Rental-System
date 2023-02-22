package com.easy.car_rental.controller;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.service.Reg_UserService;
import com.easy.car_rental.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/rent")
public class RentController {
    @Autowired
    private RentService service;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/rentIdGenerate")
    public @ResponseBody CustomDTO customerIdGenerate() {
        return service.rentIdGenerate();
    }

}
