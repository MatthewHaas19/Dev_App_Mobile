//
//  Report.swift
//  Appli-Mobile
//
//  Created by Timothée Temil on 02/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation


class Report : Decodable, Identifiable{
    

    var emailUser: String
    var idPost: String
    
    init(emailUser:String,idPost:String){
        
        self.emailUser = emailUser
        self.idPost = idPost
    }
    
}
