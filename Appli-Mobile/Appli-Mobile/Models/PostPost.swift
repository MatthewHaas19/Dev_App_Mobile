//
//  PostPost.swift
//  Appli-Mobile
//
//  Created by Timothée Temil on 03/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

class PostPost {
    
    var titre: String
    var texte: String
    var nbSignalement : Int
    var image : String?
    var localisation : [String]?
    var categorie : [String]
    var note : Int
    var date : String
    var user : String
    
    
    
    
    init(titre:String,texte:String,nbSignalement:Int,image:String?,localisation:[String]?,categorie:[String],note:Int,date:String,user:String){
        
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        
        self.titre = titre
        self.texte = texte
        self.nbSignalement = 0
        self.image = image
        self.localisation = localisation
        self.categorie = categorie
        self.note = 0
        self.date = formatter.string(from: Date())
        self.user=user
        
    }
    
}
