class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
      end

    def show
      pokemon = Pokemon.find_by(id: params[:id])
      render json: PokemonSerializer.new(pokemon)
    end

    def create
      console.log('hit Pokemon create action')
      
    end
  
    def destroy
      pokemon = Pokemon.find_by(id: params[:id])
      pokemon.destroy
      # render :json => response_hash and return
      render 'file:///home/shaun/code/labs/js-rails-as-api-pokemon-teams-project-v-000/pokemon-teams-frontend/index.html'
        end
  
  end
