package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.repo.DriverRepo;
import com.easy.car_rental.service.IncomeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Service
@Transactional
public class IncomeServiceImpl implements IncomeService {
    @Autowired
    private IncomeService incomeService;

    @Autowired
    private ModelMapper mapper;
    @Override
    public ArrayList<CustomDTO> dailyIncome() {
        return new ArrayList<>(incomeService.dailyIncome());
    }
}
