//
//  Report.swift
//  Appli-Mobile
//
//  Created by Timothée Temil on 02/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation


class Vote : Decodable, Identifiable{
    

    var user: String
    var post: String
    var like:Bool
    
    init(user:String,post:String,like:Bool){
        
        self.user = user
        self.post = post
        self.like = like
    }
    
}
