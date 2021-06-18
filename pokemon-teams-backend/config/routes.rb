Rails.application.routes.draw do
  get '/trainers' => 'trainers#index'
  get '/trainers/:id' => 'trainers#show'
  get '/pokemon' => 'pokemon#index'
  get '/pokemon/:id' => 'pokemon#show'
  post '/pokemon' => 'pokemon#create'
  delete '/pokemon/:id' => 'pokemon#delete'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
