Rails.application.routes.draw do
  resources :pokemons, only: [:create, :destroy]
  resources :trainers, only: [:index]
end