class TrainersController < ApplicationController
  #see all trainers on current team of pokemon

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer, include: [:name]
  end
end
