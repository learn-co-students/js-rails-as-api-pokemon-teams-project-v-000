Rails.application.routes.draw do
  resources :pokemons
  resources :trainers

  # get '/', :to => redirect('././pokemon-teams-frontend/index.html')

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
