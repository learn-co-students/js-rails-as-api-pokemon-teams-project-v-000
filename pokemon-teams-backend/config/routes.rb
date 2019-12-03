Rails.application.routes.draw do
  resources :pokemons
  resources :trainers

  post "/pokemons", to: "pokemons#create"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
