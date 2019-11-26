Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  # root to: 'application#index'
end
