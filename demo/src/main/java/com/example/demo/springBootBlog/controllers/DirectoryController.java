package com.example.demo.springBootBlog.controllers;

import com.example.demo.springBootBlog.entities.Blog;
import com.example.demo.springBootBlog.entities.Directory;
import com.example.demo.springBootBlog.services.DirectoryService;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/dir")
public class DirectoryController {

    @Autowired
    private DirectoryService directoryService;

    @GetMapping("/")
    public String name(){
        return "verma";
    }

    @GetMapping("/get")
    public List<Directory> allDirectory(){
        return directoryService.getAllDirectory();
    }

    @GetMapping("/getWithSort")
    public List<Directory> allDirectoryWithSort(@RequestParam("field") String field){
        return directoryService.sortDirectoryByField(field);
    }

    @GetMapping("/getWithPagination")
    public Page<Directory> getDirectoryWithPagination(@RequestParam("offset") int offset,
                                             @RequestParam("pageSize") int pageSize){
        return directoryService.directoryWithPagination(offset, pageSize);
    }

    @GetMapping("/getWithPaginationAndSort")
    public Page<Directory> getDirectoryWithPaginationAndSort(@RequestParam("offset") int offset,
                                                             @RequestParam("pageSize") int pageSize,
                                                             @RequestParam("field") String field){
        return directoryService.directoryWithPaginationAndSort(offset, pageSize, field);
    }

    @PostMapping("/create")
    public void createDir(@RequestBody Directory directory){
        try{
            directory.setCreatedDate(new Date());
            directoryService.saveDirectory(directory);
            System.out.println(directory.toString());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    @PutMapping("/update/{dirId}")
    public void updateDirectory(@PathVariable("dirId") Long dirId, @RequestBody Directory updatedDirectory) {
        directoryService.updateDirectory(dirId, updatedDirectory);
    }

    @PostMapping("/import")
    public void importExcelData(@RequestParam("file") MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();

            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            List<Directory> directoriesToRemove = new ArrayList<>();

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                Directory directory = new Directory();

                Cell idCell = row.getCell(0);
                if (idCell != null) {
                    directory.setId((long) idCell.getNumericCellValue());
                }

                Cell nameCell = row.getCell(1);
                if (nameCell != null) {
                    directory.setName(nameCell.getStringCellValue());
                }

                Cell ageCell = row.getCell(2);
                if (ageCell != null) {
                    directory.setAge((int) ageCell.getNumericCellValue());
                }

                Cell companyCell = row.getCell(3);
                if (companyCell != null) {
                    directory.setCompany(companyCell.getStringCellValue());
                }

                boolean existsInDatabase = directoryService.existsByNameAndCompany(directory.getName(), directory.getCompany());
                if (existsInDatabase) {
                    directoriesToRemove.add(directory);
                    continue;
                }

                Cell startingDateCell = row.getCell(4);
                if (startingDateCell != null) {
                    if (startingDateCell.getCellType() == CellType.NUMERIC) {
                        Date startingDate = startingDateCell.getDateCellValue();
                        directory.setStartingDate(startingDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
                    } else if (startingDateCell.getCellType() == CellType.STRING) {
                        LocalDate startingDate = LocalDate.parse(startingDateCell.getStringCellValue());
                        directory.setStartingDate(startingDate);
                    }
                }

                Cell industryCell = row.getCell(5);
                if (industryCell != null) {
                    directory.setIndustry(industryCell.getStringCellValue());
                }

                Cell ideaCell = row.getCell(6);
                if (ideaCell != null) {
                    directory.setIdea(ideaCell.getStringCellValue());
                }

                Cell educationCell = row.getCell(7);
                if (educationCell != null) {
                    directory.setEducation(educationCell.getStringCellValue());
                }

                Cell numberCell = row.getCell(8);
                if (numberCell != null) {
                    directory.setNumber((long) numberCell.getNumericCellValue());
                }

                directory.setCreatedDate(new Date());

                directoryService.saveDirectory(directory);
            }

            workbook.close();
            inputStream.close();

            for (Directory directory : directoriesToRemove) {
                directoryService.deleteDirectory(directory.getId());
            }

            System.out.println("Excel data imported and saved successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exception as needed
        }
    }

    @DeleteMapping(path = "{directoryId}")
    public void deleteDirectory(@PathVariable("directoryId") Long directoryId){
        directoryService.deleteDirectory(directoryId);
    }
}
