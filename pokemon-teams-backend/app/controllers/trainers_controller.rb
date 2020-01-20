class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers)
        
    end

    def show
        trainer = Trainer.find(params[:id])
        # render json: @trainer.to_json(:include => {:pokemon => {:only =>[:nickname, :species]}, :trainer => {:only =>[:name}}, :except => [:updated_at]} )
        
        options = {include: [:pokemon, :trainer]}
              render json: TrainerSerializer.new(trainer, options)
    end
end
