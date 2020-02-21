class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :team_size
  
private
  def pokemon_generator
    self.nickname =Faker::Games::Pokemon.name 
    self.species =Faker::Games::Pokemon.name
  end

  def team_size
     if self.trainer.pokemons.size >=6
      errors[:base] << "Team Size Limit Reached, Release a Pokemon before Continuing"
     else
      pokemon_generator
     end
  end
  

  
  
  


end
