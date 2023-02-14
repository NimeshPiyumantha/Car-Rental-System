package com.easy.car_rental.controller;

import com.easy.car_rental.dto.AdminDTO;
import com.easy.car_rental.dto.DriverDTO;
import com.easy.car_rental.service.AdminService;
import com.easy.car_rental.service.DriverService;
import com.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveDriver(@RequestBody DriverDTO dto) {
        service.saveDriver(dto);
        System.out.println(dto);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto) {
        service.updateDriver(dto);
        return new ResponseUtil("OK", "Successfully Updated. :" + dto.getDriver_Id(), null);
    }
}
