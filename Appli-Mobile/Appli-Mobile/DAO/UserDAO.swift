//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation

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
    
    func findUser(email:String) {
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/users/users/"+email) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
          guard let data = data else { return }
          let res = try! JSONDecoder().decode([User].self, from: data)
          DispatchQueue.main.async{
            print(res)
            self.currentUser = res
          }
        }.resume()
    }
    
    
    
    
    
}
