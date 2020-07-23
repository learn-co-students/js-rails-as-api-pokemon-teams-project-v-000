Rails.application.routes.draw do
    get "trainers", to: "trainers#index"

    # post "pokemons", to: "pokemons#delete"
    # post "pokemons", to: "pokemons#create"

    post 'trainers/:id/pokemons', to:'trainers#create'
    delete 'trainers/:trainer_id/pokemons/:id', to: 'trainers#delete'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
