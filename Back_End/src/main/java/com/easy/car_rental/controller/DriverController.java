package com.easy.car_rental.controller;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.DriverDTO;
import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.embeded.Name;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Driver;
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
        driverDTO.setUser(userDTO);
        driverDTO.setName(name);
        service.saveDriver(driverDTO);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/update")
    public ResponseUtil updateDriver(@ModelAttribute DriverDTO driverDTO, @ModelAttribute UserDTO userDTO, @ModelAttribute Name name) {
        driverDTO.setUser(userDTO);
        driverDTO.setName(name);
        service.updateDriver(driverDTO);
        return new ResponseUtil("OK", "Successfully Updated. :" + driverDTO.getUser_Id(), null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteDriver(@RequestParam String id) {
        service.deleteDriver(id);
        return new ResponseUtil("OK", "Successfully Deleted. :" + id, null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAllDrivers")
    public ResponseUtil getAllDriver() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.getAllDriver());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAvalabilityDrivers")
    public ResponseUtil getAllAvalabileDriver() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.getAllAvalabileDriver());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/driverIdGenerate")
    public @ResponseBody CustomDTO customerIdGenerate() {
        return service.userIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchDriver", params = {"driver_Id"})
    public Driver searchDriverId(String driver_Id) {
        return service.searchDriverId(driver_Id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/driverCount")
    public @ResponseBody CustomDTO getSumCustomer() {
        return service.getSumDriver();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/driverAvailableCount")
    public @ResponseBody CustomDTO getSumAvailableDriver() {
        return service.getSumAvailableDriver();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/driverUnavailableCount")
    public @ResponseBody CustomDTO getSumUnavailableDriver() {
        return service.getSumUnavailableDriver();
    }
}
