//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation
import SwiftUI

public class PostDAO: ObservableObject{
    
    @Published var posts = [Post]()
    @Published var currentPost = [Post]()
    @Published var myPost = [Post]()
    @Published var localisation = ["",""]
    
    init(){
        loadData()
    }
    
    
    func loadData(){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts") else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Post].self, from: data)
            DispatchQueue.main.async{
                self.posts = res
            }
        }.resume()
    }
    
    
    func getMyPosts(email:String){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts/user/"+email) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Post].self, from: data)
            DispatchQueue.main.async{
                self.myPost = res
            }
        }.resume()
    }
    
    
    
    func findById(id:String) {
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts/"+id) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Post].self, from: data)
            DispatchQueue.main.async{
                self.posts = res
            }
        }.resume()
    }
    
    func filter(cat:String){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts/categorie/"+cat) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Post].self, from: data)
            DispatchQueue.main.async{
                self.posts = res
            }
        }.resume()
    }
    
    
    func filterAll(filter:FilterType) {
        
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts/filter/a") else { return }
        
        let filter:[String: Any] = [
            "type":filter.type,
            "tags":filter.tags,
            "localisation":filter.localisation,
            "categorie":filter.categories
        ]
        
        
        let body = try! JSONSerialization.data(withJSONObject: filter)
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.httpBody = body
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in

            guard let data = data else { return }
            
            let resData = try! JSONDecoder().decode([Post].self, from: data)


            
                DispatchQueue.main.async{
                    self.posts = resData
                }

        }.resume()
 
    }
    
    
    
    

    func addVote(vote: Vote,post:Post ,completionHandler: @escaping (Int) -> ()) {
        var like:String
        if(vote.like){
            like="true"
        }
        else{
            like="false"
        }
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts/addVote/"+like) else { return }
        
        let newVote:[String: Any] = [
            "_id" : post._id
        ]
        
        
        let body = try! JSONSerialization.data(withJSONObject: newVote)
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.httpBody = body
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in

            guard let data = data else { return }
            
            let resData = try! JSONDecoder().decode(ServerMessage.self, from: data)


            if resData.res == "correct" {
                DispatchQueue.main.async {
                    completionHandler(1)
                }

            }
            else if resData.res == "exists"{
                DispatchQueue.main.async {
                    completionHandler(0)
                }
            }
            
            else {
                DispatchQueue.main.async {
                    completionHandler(-1)
                }
            }
               
            


        }.resume()
        
        
    }
    
    
    
    func addPost(post: PostPost, completionHandler: @escaping (Bool) -> ()) {
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts") else { return }
        
        let newPost:[String: Any?] = [
            "titre" : post.titre,
            "texte" : post.texte,
            "nbSignalement" : post.nbSignalement,
            "image" : post.image,
            "localisation" : post.localisation,
            "categorie" : post.categorie,
            "note" : post.note,
            "commentaire" : [],
            "date" : post.date,
            "user" : post.user,
            "isAnonyme" : post.isAnonyme,
            "couleur" : post.couleur
        ]
        
        let body = try! JSONSerialization.data(withJSONObject: newPost)
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"

        request.httpBody = body
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in

            guard let data = data else { return }
            
            let resData = try! JSONDecoder().decode(ServerMessage.self, from: data)

            print(resData.res)

            if resData.res == "correct" {
                DispatchQueue.main.async {
                    completionHandler(true)
                }

            }
            else {
                DispatchQueue.main.async {
                    completionHandler(false)
                }
            }

        }.resume()

    }
    
    
    func delete(post : Post , completionHandler: @escaping (Bool) -> ()){
         
         
         guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts") else { return }
         
         let postToDelete:[String: Any] = [
             "_id" : post._id
         ]

         let body = try! JSONSerialization.data(withJSONObject: postToDelete)
         
         var request = URLRequest(url: url)
         request.httpMethod = "DELETE"
         request.httpBody = body
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         
         URLSession.shared.dataTask(with: request) { (data, response, error) in

             guard let data = data else { return }
             
             let resData = try! JSONDecoder().decode(ServerMessage.self, from: data)


             if resData.res == "correct" {
                 DispatchQueue.main.async {
                     completionHandler(true)
                 }
             }
             
             else {
                 DispatchQueue.main.async {
                     completionHandler(false)
                 }
             }

         }.resume()
    }
    
    
    func getPosition(currentPosition:[String]?,postPosition:[String]?) -> String{
        var dist = ""
            
            if(currentPosition == nil || postPosition==nil){
                print("NIL")
                return "Not known"
            }else{
                dist = distance(lat1: Double(currentPosition![0])!, lon1: Double(currentPosition![1])!, lat2: Double(postPosition![0])!, lon2: Double(postPosition![1])!, unit: "K")
                return dist
            }
            
    }
    
    
    func deg2rad(deg:Double) -> Double {
        return deg * Double.pi / 180
    }

    func rad2deg(rad:Double) -> Double {
        return rad * 180.0 / Double.pi
    }

    func distance(lat1:Double, lon1:Double, lat2:Double, lon2:Double, unit:String) -> String {
        if(lat1==0 || lat2==0){
            return "Not know"
        }
        let theta = lon1 - lon2
        var dist = sin(deg2rad(deg:lat1)) * sin(deg2rad(deg:lat2)) + cos(deg2rad(deg:lat1)) * cos(deg2rad(deg:lat2)) * cos(deg2rad(deg:theta))
        dist = acos(dist)
        dist = rad2deg(rad:dist)
        dist = dist * 60 * 1.1515
        if (unit == "K") {
            dist = dist * 1.609344
        }
        else if (unit == "N") {
            dist = dist * 0.8684
        }
        print(dist)
        return String(Int(dist))
    }
    

}

