package com.easy.car_rental.dto;

import com.easy.car_rental.embeded.Name;
import com.easy.car_rental.enums.AvailabilityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DriverDTO {
    private String user_Id;
    private Name name;
    private String contact_No;
    private String address;
    private String email;
    private String nic_No;
    private String license_No;
    private MultipartFile license_Img;
    private AvailabilityType driverAvailability;

    private UserDTO user;

}
