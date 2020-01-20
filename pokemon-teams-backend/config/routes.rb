Rails.application.routes.draw do
  resources :pokemons
  resources :trainers, only: [:index, :show]
end
