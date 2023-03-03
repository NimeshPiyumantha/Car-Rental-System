package com.easy.car_rental.controller;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.RentDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.entity.Rent;
import com.easy.car_rental.service.Reg_UserService;
import com.easy.car_rental.service.RentService;
import com.easy.car_rental.util.ResponseUtil;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil placeOrder(@RequestBody RentDTO dto) {
        service.bookingCars(dto);
        return new ResponseUtil("Ok", "Successfully Purchased.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/booking")
    public @ResponseBody CustomDTO getSumOfBooking() {
        return service.getSumOfBooking();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/bookingPending")
    public @ResponseBody CustomDTO getSumOfBookingPending() {
        return service.getSumOfBookingPending();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/bookingActive")
    public @ResponseBody CustomDTO getSumOfBookingActive() {
        return service.getSumOfBookingActive();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAllRents")
    public ResponseUtil getAllRents() {
        System.out.println(service.getAllRent());
        return new ResponseUtil("OK", "Successfully Loaded. :", service.getAllRent());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteRent(@RequestParam String id) {
        service.deleteRent(id);
        return new ResponseUtil("OK", "Successfully Deleted. :" + id, null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/rentConfrom", params = {"rentID", "driverId"})
    public ResponseUtil bookingConform(@RequestParam String rentID, @RequestParam String driverId) {
        service.bookingConform(rentID,driverId);
        return new ResponseUtil("OK", "Successfully Conformed.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/rentReject", params = {"rentID", "driverId"})
    public ResponseUtil bookingReject(@RequestParam String rentID, @RequestParam String driverId) {
        service.bookingReject(rentID,driverId);
        return new ResponseUtil("OK", "Successfully Conformed.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchDtails", params = {"search_Id"})
    public RentDTO searchId(String search_Id) {
        return service.searchId(search_Id);
    }

}