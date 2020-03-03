//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation


public class PostDAO: ObservableObject{
    
    @Published var posts = [Post]()
    @Published var currentPost = [Post]()
    
    
    init(){
        loadData()
    }
    
    
    func loadData(){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts") else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Post].self, from: data)
            DispatchQueue.main.async{
                print(res)
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
                print(res)
                self.posts = res
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
        
        let newReport:[String: Any] = [
            "_id" : post._id
        ]
        
        
        let body = try! JSONSerialization.data(withJSONObject: newReport)
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.httpBody = body
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in

            guard let data = data else { return }
            
            let resData = try! JSONDecoder().decode(ServerMessage.self, from: data)

            print(resData.res)

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
            "user" : post.user
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

}

