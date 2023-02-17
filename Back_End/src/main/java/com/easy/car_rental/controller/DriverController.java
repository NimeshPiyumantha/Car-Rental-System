package com.easy.car_rental.controller;

import com.easy.car_rental.dto.DriverDTO;
import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.embeded.Name;
import com.easy.car_rental.service.DriverService;
import com.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    private DriverService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveDriver(@ModelAttribute DriverDTO driverDTO, @ModelAttribute UserDTO userDTO, @ModelAttribute Name name) {
        driverDTO.setUserDTO(userDTO);
        driverDTO.setName(name);
        service.saveDriver(driverDTO);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto) {
        service.updateDriver(dto);
        return new ResponseUtil("OK", "Successfully Updated. :" + dto.getUser_Id(), null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(params = {"driver_Id"})
    public ResponseUtil deleteDriver(@RequestParam String driver_Id) {
        service.deleteDriver(driver_Id);
        return new ResponseUtil("OK", "Successfully Deleted. :" + driver_Id, null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllDriver() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.getAllDriver());
    }
}
