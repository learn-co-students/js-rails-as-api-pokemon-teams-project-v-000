class CreateTrainers < ActiveRecord::Migration[5.2]
  def change
    create_table :trainers do |t|
      t.string :name

      t.timestamps
    end
  end
end

#used these to make the migrations
#rails g resource trainer name
#rails g resource pokemon species nickname trainer:references