class TrainersController < ApplicationController

    # get all trainers
    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end

    # get one trainer
    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, include: [:pokemons]
    end
  
end
