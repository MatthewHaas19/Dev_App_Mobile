//
//  UserService.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 27/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

class UserService : ObservableObject{
    
    @ObservedObject var userDAO = UserDAO()
    @Published var users = [User]()
    
    init(){
        self.users = userDAO.users
    }
    
}
