import Combine
import SwiftUI

class API: BindableObject {
    var didChange = PassthroughSubject<NetworkManager, Never>()
    var persons = User[]{
        didSet {
            didChange.send(self)
        }
    }
    
    guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/users/users") else { return }
    URLSession.shared.dataTask(with: url){(data, _, _) in
    guard let data = data else { return }
    let persons = try! JSONDecoder().decode([User].self, from: data)
    DispatchQueue.main.async{
    self.persons = persons
    }
    }.resume()
}
}
