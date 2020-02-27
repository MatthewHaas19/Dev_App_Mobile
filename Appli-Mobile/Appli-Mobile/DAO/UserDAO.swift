//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

struct ServerMessage: Decodable {
   let res, message: String
}


public class UserDAO: ObservableObject{
    
    @Published var users = [User]()
    @Published var currentUser = [User]()
    
    
    init(){
        loadData()
    }
    
    
    func loadData(){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/users/users") else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
          guard let data = data else { return }
          let res = try! JSONDecoder().decode([User].self, from: data)
          DispatchQueue.main.async{
            print(res)
            self.users = res
          }
        }.resume()
    }
    
    func findUser(email:String, completionHandler: @escaping ([User]) -> ()) {
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/users/users/"+email) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
          guard let data = data else { return }
          let res = try! JSONDecoder().decode([User].self, from: data)
          DispatchQueue.main.async{
            print(res)
            self.currentUser = res
            completionHandler(res)
          }
        }.resume()
    }
    
    func addUser(user: UserPost, completionHandler: @escaping (Bool) -> ()){
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/users/users") else { return }
        
        let newUser:[String: Any] = [
            "email" : user.email,
            "password" : user.password,
            "username" : user.username,
            "posts" : user.posts
        ]
        
        let body = try! JSONSerialization.data(withJSONObject: newUser)
        
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
            else{
               DispatchQueue.main.async {
                    completionHandler(false)
                }
            }

        }.resume()
        
        
    }
    
    
    
    
    
}
