//
//  FilterType.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 05/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class filterType {
    var type:String,
    var tags:[String],
    var localisation:String,
    var categories:[String]
    
    init(type:String,tags:[String],localisation:String,categories:[String]){
        self.type=type
        self.tags=tags
        self.localisation=localisation
        self.categories=categories
    }
}
