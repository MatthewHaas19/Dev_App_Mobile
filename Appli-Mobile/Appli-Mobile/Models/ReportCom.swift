//
//  ReportCom.swift
//  Appli-Mobile
//
//  Created by user165001 on 3/4/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class ReportCom : Decodable, Identifiable{
    

    var emailUser: String
    var idCom: String
    
    init(emailUser:String,idCom:String){
        
        self.emailUser = emailUser
        self.idCom = idCom
    }
    
}
