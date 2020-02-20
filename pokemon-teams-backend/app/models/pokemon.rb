class Pokemon < ApplicationRecord
  belongs_to :trainer
  validates :nickname,:species, presence: true
  after_initialize :pokemon_generator
  
private
  def pokemon_generator
    self.nickname =Faker::Games::Pokemon.name 
    self.species =Faker::Games::Pokemon.name
  end
  


end
