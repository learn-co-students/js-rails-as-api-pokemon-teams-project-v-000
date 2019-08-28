class TrainersController < ApplicationController

    def index 
        #serialized JSON trainers with pokemon
        trainers = Trainer.all
        render :json => trainers, include: [:pokemons]
    end
end
