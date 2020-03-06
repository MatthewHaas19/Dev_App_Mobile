//
//  Post.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 23/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//



import Foundation



class Post : Decodable, Identifiable, CustomStringConvertible {
   
    
    
    var _id: String
    var description: String {return " \(self.titre) "}
    var titre: String
    var texte: String
    var nbSignalement : Int
    var image : String?
    var localisation : [String]?
    var categorie : [String]
    var note : Int
    var date : String
    var user : String
    var isAnonyme : Bool
    var couleur : [Double]
 
    
    init(id : String , titre:String,texte:String,nbSignalement : Int,image:String?,localisation:[String]?,categorie : [String],note:Int,date:String,user:String, isAnonyme:Bool, couleur : [Double]){
        self._id = id
        self.titre = titre
        self.texte = texte
        self.nbSignalement=nbSignalement
        self.image=image
        self.localisation=localisation
        self.categorie=categorie
        self.note = note
        self.date=date
        self.user=user
        self.isAnonyme=isAnonyme
        self.couleur = couleur
    }
}
