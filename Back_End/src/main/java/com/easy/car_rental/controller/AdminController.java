package com.easy.car_rental.controller;

import com.easy.car_rental.dto.AdminDTO;
import com.easy.car_rental.service.AdminService;
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
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveAdmin(@RequestBody AdminDTO dto) {
        service.saveAdmin(dto);
        System.out.println(dto);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateAdmin(@RequestBody AdminDTO dto) {
        service.updateAdmin(dto);
        return new ResponseUtil("OK", "Successfully Updated. :" + dto.getUser_Id(), null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(params = {"admin_Id"})
    public ResponseUtil deleteAdmin(@RequestParam String admin_Id) {
        service.deleteAdmin(admin_Id);
        return new ResponseUtil("OK", "Successfully Deleted. :" + admin_Id, null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllAdmin() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.getAllAdmin());
    }

}
