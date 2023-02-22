package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.RentDTO;
import com.easy.car_rental.repo.Reg_UserRepo;
import com.easy.car_rental.repo.RentRepo;
import com.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Service
@Transactional
public class RentServiceImpl implements RentService {
    @Autowired
    private RentRepo repo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public CustomDTO rentIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public void bookingCars(RentDTO dto) {

    }
}
